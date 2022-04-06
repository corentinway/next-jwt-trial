import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

type Query = {
    username: string,
    password: string
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<boolean>
) {
    console.log('received request ', req.body);
    const {username, password} : Query = req.body;

    const isValid : boolean = username === 'corentin' 
    && password === 'azerty';

    res.status(200);
    res.send(isValid);

}