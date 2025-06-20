import dotenv from 'dotenv';
dotenv.config();
import { Webhook } from 'svix';
import userModel from '../models/userModel.js';

export const clerkWebhook = async (req, res) => {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if(!WEBHOOK_SECRET){
        throw new Error('webhook secret needed');
    }

    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;
    try {
        evt = wh.verify(payload, headers);
    } catch (err) {
        res.status(400).json({
            message: "webhook verification failed"
        });
    }

    if(evt.type === 'user.created'){

        const createduser = await userModel.create({
            clerkID: evt.data.id,
            username: evt.data.username || evt.data.email_addresses[0].email_address,
            email: evt.data.email_addresses[0].email_address,
            img: evt.data.image_url,

        });

        console.log("user created successfully");

    }

    if(evt.type === 'user.deleted'){
        await userModel.findOneAndDelete({clerkID: evt.data.id});
        console.log("user deleted successfully");
    }

    if(evt.type === 'user.updated'){
        await userModel.findOneAndUpdate(
            { clerkID: evt.data.id },
            {
                username: evt.data.username || evt.data.email_addresses[0].email_address,
                email: evt.data.email_addresses[0].email_address,
                img: evt.data.image_url,
            },
            { new: true }
        );
        console.log("user updated successfully");
    }

    return res.status(200).json({
        message: "webhook received"
    })

}