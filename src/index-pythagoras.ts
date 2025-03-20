import { main, type Element } from './conceptboard';
import { hslToHex } from './helpers';

const degreesToRads = deg => (deg * Math.PI) / 180.0;

function rotatedPoint(origin: {x: number, y: number}, length: number, rotation: number) {
    const rad = degreesToRads(rotation);
    return {
        x: origin.x + Math.sin(rad) * length,
        y: origin.y + Math.cos(rad) * length,
    };
}

const randomElementId = () => {
    return `u_bdeb1fcc_jaller-script_${Math.random()}`;
};

function translateNeoboardToConceptboard(elements: {
    position: {
        x: number,
        y: number,
    },
    points: [
        {
            x: number,
            y: number,
        },
        {
            x: number,
            y: number,
        }
    ],
    strokeColor: string,
}[]): Element[] {
    return elements.map(line => ({
        "type":"line",
        "del":null,
        "id": randomElementId(),
        "seq":null,
        "z":"2",
        "lc":line.strokeColor,
        "lo":"100",
        "lw":"3",
        "ls":"solid",
        "la":"none",
        "lj":"round",
        "ct":"straight",
        "a":{
            "x":line.position.x + line.points[0].x,
            "y":line.position.y + line.points[0].y,
        },
        "b":{
            "x":line.position.x + line.points[1].x,
            "y":line.position.y + line.points[1].y,
        },
        "pa":null,
        "authorid":null,
        "origAuthorid":null,
        "origDte":null,
        "dte":"",
        "conn":[],
        "pinned":null
    }));
}

function draw(origin: { x: number, y: number }, length = 50, rot = 0, recursion = 4) {
    if (recursion <= 0) {
        return [];
    }
    const arr = [
        {
            position: origin,
            type: 'path',
            kind: 'line',
            strokeColor: hslToHex((origin.x - 140) / (1920 - 280) * 360, 100 - (recursion / 10 * 90), 40 + (origin.y / 1080 * 20)),
            points: [
                {
                    x: 0,
                    y: 0,
                },
                rotatedPoint({ x: 0, y: 0 }, length, rot),
            ],
        },
        {
            position: origin,
            type: 'path',
            kind: 'line',
            strokeColor: hslToHex((origin.x - 140) / (1920 - 280) * 360, 100 - (recursion / 10 * 90), 40 + (origin.y / 1080 * 20)),
            points: [
                {
                    x: 0,
                    y: 0,
                },
                rotatedPoint({ x: 0, y: 0 }, length, rot + 90),
            ],
        },
        {
            position: origin,
            type: 'path',
            kind: 'line',
            strokeColor: hslToHex((origin.x - 140) / (1920 - 280) * 360, 100 - (recursion / 10 * 90), 40 + (origin.y / 1080 * 20)),
            points: [
                rotatedPoint(rotatedPoint({ x: 0, y: 0 }, length, rot), length, rot + 90),
                rotatedPoint({ x: 0, y: 0 }, length, rot),
            ],
        },
        {
            position: origin,
            type: 'path',
            kind: 'line',
            strokeColor: hslToHex((origin.x - 140) / (1920 - 280) * 360, 100 - (recursion / 10 * 90), 40 + (origin.y / 1080 * 20)),
            points: [
                rotatedPoint(rotatedPoint({ x: 0, y: 0 }, length, rot), length, rot + 90),
                rotatedPoint({ x: 0, y: 0 }, length, rot + 90),
            ],
        },
    ];
    const newLength = length * Math.sqrt(2) / 2;
    return [
        ...arr,
        ...draw(rotatedPoint(origin, length, rot), newLength, rot - 45, recursion - 1),
        ...draw(rotatedPoint(rotatedPoint(rotatedPoint(origin, length, rot), newLength, rot - 45), length, rot + 90), -newLength, rot + 45 + 180, recursion - 1),
    ];
}

main(translateNeoboardToConceptboard(draw({ x: 1100, y: 1000 }, -240, 0, 10)));
