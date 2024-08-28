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
    const fileStream = Readable.from(file.buffer);
    console.log(fileStream.toString());
    const params = {
        Bucket: BUCKET_NAME,
        Key: file.originalname,
        Body: fileStream,
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