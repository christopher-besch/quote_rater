const quote_regex = /### +(.*)\n```\n((?:.|\n)*?)\n—(.*)\n```\n((?:- +.+\n)*)/gm;

export type Quote = {
    origin: string;
    text: string;
    author: string;
    comments: string;
};

export class QuotesHandler {
    private url: string = "";
    private should_render: boolean = true;
    private quotes: Quote[] = [];
    private quotes_order: number[] = [];

    private adj: number[][] = [];
    private link: number[] = [];
    private size: number[] = [];
    private left_idx: number = -1;
    private right_idx: number = -1;
    private components_amount: number = 0;

    constructor(url: string = "", callback: { (): void } = () => { }) {
        if (url == "") {
            this.should_render = false;
            return;
        }
        this.url = url;
        this.dwn(url, (response) => {
            let match;
            while (match = quote_regex.exec(response)) {
                this.quotes.push({ origin: match[1], text: match[2], author: match[3], comments: match[4] });
            }
            this.setup();
            this.top_sort();
            this.next_question();
            callback();
        });
    }

    public get_should_render(): boolean {
        return this.should_render;
    }

    public next_question(): void {
        // terribly inefficient, too bad
        do {
            this.left_idx = Math.floor(Math.random() * this.quotes.length);
            this.right_idx = Math.floor(Math.random() * this.quotes.length);
        } while (this.same(this.left_idx, this.right_idx))
        console.log(`using quotes ${this.left_idx} and ${this.right_idx}`);
    }

    public get_quotes_string(): string {
        let out: string = "";
        for (let idx of this.quotes_order) {
            let quote = this.quotes[idx];
            out += `### ${quote.origin}\n\`\`\`\n${quote.text}\n—${quote.author}\n\`\`\`\n${quote.comments}\n`;
        }
        return out;
    }

    // to be executed from react
    // because apparently this garbage requires multi-threaded-level of fuckery
    public get_left_quote(): Quote {
        console.log(this.left_idx);
        return this.quotes[this.left_idx];
    }
    public get_right_quote(): Quote {
        return this.quotes[this.right_idx];
    }

    public get_quotes_amount(): number {
        return this.quotes.length;
    }

    public get_components_amount(): number {
        return this.components_amount;
    }

    private dwn(url: string, callback: { (response: string): void }): void {
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

    private setup(): void {
        for (let i = 0; i < this.quotes.length; ++i) {
            this.adj.push([]);
            this.link[i] = i;
            this.size[i] = 1;
        }
        this.components_amount = this.quotes.length;
    }
    private find(x: number): number {
        while (x != this.link[x])
            x = this.link[x];
        return x;
    }
    private same(a: number, b: number): boolean {
        return this.find(a) == this.find(b);
    }
    // don't use with nodes from same component
    private unite(a: number, b: number): void {
        a = this.find(a);
        b = this.find(b);
        if (this.size[a] < this.size[b])
            [a, b] = [b, a];
        this.size[a] += this.size[b];
        this.link[b] = a;
        --this.components_amount;
    }

    private top_sort(): void {
        this.quotes_order = [];
        let status: number[] = [];
        for (let i = 0; i < this.quotes.length; ++i)
            status.push(0);
        for (let i = 0; i < this.quotes.length; ++i)
            this.top(i, status);
    }
    private top(cur: number, status: number[]) {
        if (status[cur] == 2)
            return;
        status[cur] = 1;

        for (let next of this.adj[cur])
            this.top(next, status);

        this.quotes_order.push(cur);
        status[cur] = 2;
    }

};
