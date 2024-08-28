const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Readable } = require('stream');

const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECREAT_KEY,
    },
});

const BUCKET_NAME = 'personal-project-s3-bucket';

async function uploadToS3(file) {
    console.log(file, "file");
    if (!file || !file.buffer) {
        throw new Error('Invalid file object. File buffer is missing.');
    }
    // const fileStream = Readable.from(file.buffer);
    const params = {
        Bucket: BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,

    };

    try {
        await s3Client.send(new PutObjectCommand(params));
        console.log('File uploaded successfully');
        return true;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to upload file');
    }
}


module.exports = {
    uploadToS3,
};