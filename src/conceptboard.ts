import process from 'node:process';

export type Element = Record<string, unknown> & {
    type: string,
};

export async function uploadElements(boardId: string, elements: Element[]) {
    return fetch(`https://app.conceptboard.com/__/publish/${encodeURIComponent(boardId)}`, {
        "credentials": "include",
        "headers": {
            "Cookie": process.env.CONCEPTBOARD_COOKIE!,
            "Content-Type": "application/json",
            "X-CB-CSRF": process.env.CONCEPTBOARD_CSRF!,
        },
        "body": JSON.stringify(elements),
        "method": "POST",
    });
}

export async function main(elements: Element[]) {
    const res = await uploadElements(process.env.CONCEPTBOARD_BOARD_UUID!, elements);
    if (res.ok) {
        console.log('Elements created');
    } else {
        console.log(res);
        console.log(await res.text());
    }
}

