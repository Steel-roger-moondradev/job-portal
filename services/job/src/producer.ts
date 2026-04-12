import { Kafka,Producer,Admin } from 'kafkajs'
import dotenv from 'dotenv'

dotenv.config();

let producer:Producer;
let admin:Admin;
export const connectkafka=async()=>{
    try{
        const kafka = new Kafka({
        clientId: 'job-service',
        brokers: [process.env.KAFKA_BROKER||'localhost:9092'],
        })
     admin = kafka.admin()
    producer=kafka.producer();
        await admin.connect();
        const topics=await admin.listTopics();
        if(!topics.includes("send-mail")){
            await admin.createTopics({
                topics:[{
                    topic:process.env.KAFKA_TOPIC as string,
                    numPartitions:1,
                    replicationFactor:1,
                },],
            });
        }
        console.log("✅ Topic send-mail created");
        await admin.disconnect();
        await producer.connect();
        console.log("✅ connected to kafka producer");
    }
    catch(error:any){
        console.log("Failed to make producer",error);
    }
}

export const publishToProducer =async(topic:string,message:any)=>{
    if(!producer){
        console.log("Kafka producer is not initialised");
        return;
    }

    try{
    await producer.send({
        topic:topic,
        messages:[
            {
                value:JSON.stringify(message),
            },
                ],

    })
    }
    catch(error:any){
        console.log("Failed to publish message to kafka",error);
    }
};

export const disconnectKafka=async()=>{
    if(producer){
        await producer.disconnect();
    }
};