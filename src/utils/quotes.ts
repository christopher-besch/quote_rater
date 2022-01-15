import { join } from "path/posix";

const quote_regex = /### +(.*)\n```\n((?:.|\n)*?)\n—(.*)\n```\n((?:- +.+\n)*)/gm;

export type Quote = {
    origin: string;
    text: string;
    author: string;
    comments: string;
};

// React doesn't support mutable objects...JavaScript doesn't allow constructor overloading...RAAI through the drain...this hurts
export type LoadedQuotes = {
    quotes: Quote[];
    url: string;
};
export function get_loaded_quotes(): LoadedQuotes {
    return {
        quotes: [],
        url: "",
    };
}
function copy_loaded_quotes(loaded_quotes: LoadedQuotes): LoadedQuotes {
    return {
        quotes: loaded_quotes.quotes,
        url: loaded_quotes.url,
    }
}

export type QuotesHandler = {
    should_render: boolean;
    quotes_order: number[];
    adj: number[][];
    link: number[];
    size: number[];
    left_idx: number;
    right_idx: number;
    quotes_amount: number,
    components_amount: number;
};
export function get_quotes_handler(): QuotesHandler {
    return {
        should_render: false,
        quotes_order: [],
        adj: [],
        link: [],
        size: [],
        left_idx: -1,
        right_idx: -1,
        quotes_amount: 0,
        components_amount: 0,
    };
}
function copy_quotes_handler(quotes_handler: QuotesHandler): QuotesHandler {
    return {
        should_render: quotes_handler.should_render,
        quotes_order: quotes_handler.quotes_order,
        adj: quotes_handler.adj,
        link: quotes_handler.link,
        size: quotes_handler.size,
        left_idx: quotes_handler.left_idx,
        right_idx: quotes_handler.right_idx,
        quotes_amount: quotes_handler.quotes_amount,
        components_amount: quotes_handler.components_amount,
    };
}

export function setup_loaded_quotes(url: string = "", callback: { (loaded_quotes: LoadedQuotes): void } = () => { }): void {
    let loaded_quotes = get_loaded_quotes();
    loaded_quotes.url = url;
    dwn(url, (response) => {
        let match;
        while (match = quote_regex.exec(response)) {
            loaded_quotes.quotes.push({ origin: match[1], text: match[2], author: match[3], comments: match[4] });
        }
        callback(loaded_quotes);
    });
}

export function setup_quotes_handler(loaded_quotes: LoadedQuotes): QuotesHandler {
    let quotes_handler = get_quotes_handler();
    quotes_handler.quotes_amount = loaded_quotes.quotes.length;
    quotes_handler.should_render = true;
    for (let i = 0; i < quotes_handler.quotes_amount; ++i) {
        quotes_handler.adj.push([]);
        quotes_handler.link[i] = i;
        quotes_handler.size[i] = 1;
    }
    quotes_handler.components_amount = quotes_handler.quotes_amount;
    calc_order(quotes_handler);
    next_question(quotes_handler);
    return quotes_handler;
}

export function update_question(quotes_handler: QuotesHandler): QuotesHandler {
    next_question(quotes_handler);
    return copy_quotes_handler(quotes_handler);
}
export function set_left_better(quotes_handler: QuotesHandler): QuotesHandler {
    quotes_handler.adj[quotes_handler.left_idx].push(quotes_handler.right_idx);
    unite(quotes_handler, quotes_handler.left_idx, quotes_handler.right_idx);
    calc_order(quotes_handler);
    next_question(quotes_handler);
    return copy_quotes_handler(quotes_handler);
}
export function set_right_better(quotes_handler: QuotesHandler): QuotesHandler {
    quotes_handler.adj[quotes_handler.right_idx].push(quotes_handler.left_idx);
    unite(quotes_handler, quotes_handler.left_idx, quotes_handler.right_idx);
    calc_order(quotes_handler);
    next_question(quotes_handler);
    return copy_quotes_handler(quotes_handler);
}

export function get_quotes_string(loaded_quotes: LoadedQuotes, quotes_handler: QuotesHandler): string {
    console.log(quotes_handler.quotes_order);
    let out: string = "";
    for (let idx of quotes_handler.quotes_order) {
        let quote = loaded_quotes.quotes[idx];
        out += `### ${quote.origin}\n\`\`\`\n${quote.text}\n—${quote.author}\n\`\`\`\n${quote.comments}\n`;
    }
    return out;
}

// bounds checking required because of React fuckery
export function get_left_quote(loaded_quotes: LoadedQuotes, quotes_handler: QuotesHandler): Quote | undefined {
    if (quotes_handler.left_idx >= loaded_quotes.quotes.length)
        return undefined;
    return loaded_quotes.quotes[quotes_handler.left_idx];
}
export function get_right_quote(loaded_quotes: LoadedQuotes, quotes_handler: QuotesHandler): Quote | undefined {
    if (quotes_handler.right_idx >= loaded_quotes.quotes.length)
        return undefined;
    return loaded_quotes.quotes[quotes_handler.right_idx];
}

function dwn(url: string, callback: { (response: string): void }): void {
    let request = new XMLHttpRequest();
    request.onload = () => {
        if (request.status == 200)
            callback(request.responseText);
        else {
            console.error(`Failed to load '${url}' with status ${request.status}`);
        }
    };
    request.onerror = () => {
        console.error(`Failed to load '${url}'`);
    };
    request.open("GET", url, true);
    request.send();
}

function find(quotes_handler: QuotesHandler, x: number): number {
    while (x != quotes_handler.link[x])
        x = quotes_handler.link[x];
    return x;
}
function same(quotes_handler: QuotesHandler, a: number, b: number): boolean {
    return find(quotes_handler, a) == find(quotes_handler, b);
}
// don't use with nodes from same component
function unite(quotes_handler: QuotesHandler, a: number, b: number): void {
    a = find(quotes_handler, a);
    b = find(quotes_handler, b);
    if (quotes_handler.size[a] < quotes_handler.size[b])
        [a, b] = [b, a];
    quotes_handler.size[a] += quotes_handler.size[b];
    quotes_handler.link[b] = a;
    --quotes_handler.components_amount;
}

function calc_order(quotes_handler: QuotesHandler,): void {
    quotes_handler.quotes_order = [];
    let status: number[] = [];
    for (let i = 0; i < quotes_handler.quotes_amount; ++i)
        status.push(0);
    // reverse <- more convenient
    for (let i = quotes_handler.quotes_amount - 1; i >= 0; --i)
        top_sort(quotes_handler, i, status);
    quotes_handler.quotes_order.reverse();
    console.log(quotes_handler.quotes_order);
}
function top_sort(quotes_handler: QuotesHandler, cur: number, status: number[]) {
    if (status[cur] == 2)
        return;
    status[cur] = 1;

    for (let next of quotes_handler.adj[cur])
        top_sort(quotes_handler, next, status);

    quotes_handler.quotes_order.push(cur);
    status[cur] = 2;
}

function next_question(quotes_handler: QuotesHandler): void {
    if (quotes_handler.components_amount < 2)
        return;
    // terribly inefficient, too bad
    do {
        quotes_handler.left_idx = find(quotes_handler, Math.floor(Math.random() * quotes_handler.quotes_amount));
        quotes_handler.right_idx = find(quotes_handler, Math.floor(Math.random() * quotes_handler.quotes_amount));
    } while (quotes_handler.left_idx == quotes_handler.right_idx)
    console.log(`using quotes ${quotes_handler.left_idx} and ${quotes_handler.right_idx}`);
}
