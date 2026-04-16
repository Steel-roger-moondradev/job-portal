import { Kafka } from 'kafkajs'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

export const sendMailConsumer=async()=>{
const kafka = new Kafka({
  clientId: 'utils-service',
  brokers: [process.env.KAFKA_BROKER||'localhost:9092'],
})
const consumer = kafka.consumer({ groupId: 'group-1' });

await consumer.connect()
await consumer.subscribe({ topic: process.env.KAFKA_TOPIC as string, fromBeginning: false })
console.log("✅ Mail service started");

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    try{
       const {to,subject,html}=JSON.parse(message.value?.toString()||"{}");

       const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_KEY,
        },
});

        
  const info = await transporter.sendMail({
    from: `"Work-Sphere" <${process.env.MAIL_ID}>`,
    to,
    subject,
    html,
  });
  console.log(`Mail has been sent to ${to}`)
    }

    catch(error:any){
        console.log("Failed to send message ", error);
    }
    
  },
})
}