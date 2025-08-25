const db = require("../models");
const { sendOrderProofReceivedEmail, sendOrderApprovedEmail, sendOrderRejectedEmail } = require("../services/email.service");
const crypto = require('crypto');
require('dotenv').config();

const Order = db.order;
const Secret = db.secret;
const User = db.user;

const algorithm = 'aes-256-cbc';
const secretKey = process.env.SECRET_ENCRYPTION_KEY; // A 32-byte key

// Function to encrypt a secret
const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
};

// Function to decrypt a secret
const decrypt = (text) => {
    const iv = Buffer.from(text.iv, 'hex');
    const encryptedText = Buffer.from(text.encryptedData, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};


exports.createOrder = async (req, res) => {
    try {
        const { serviceId } = req.body;
        const userId = req.userId;

        const order = await Order.create({
            userId: userId,
            serviceId: serviceId,
            status: 'pending'
        });

        res.status(201).send(order);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.uploadProof = async (req, res) => {
    // This is a simplified version. In a real app, use a library like multer for file uploads.
    const { transaction_code, transaction_proof_url } = req.body;
    const orderId = req.params.id;

    try {
        const order = await Order.findByPk(orderId);
        if (!order || order.userId !== req.userId) {
            return res.status(404).send({ message: "Order not found or you don't have permission." });
        }

        await order.update({
            transaction_code,
            transaction_proof_url,
        });

        // Notify admin
        const admin = await User.findOne({ where: { role: 'admin' } });
        if (admin) {
            await sendOrderProofReceivedEmail(admin.email);
        }

        res.send({ message: "Proof uploaded successfully. Awaiting approval." });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({ where: { userId: req.userId }, include: ["service"] });
        res.send(orders);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({ include: ["user", "service"] });
        res.send(orders);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.approveOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await Order.findByPk(orderId, { include: ["user"] });
        if (!order) {
            return res.status(404).send({ message: "Order not found." });
        }

        // Generate a random secret
        const rawSecret = crypto.randomBytes(16).toString('hex');
        const encryptedSecret = encrypt(rawSecret);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30); // Secret valid for 30 days

        await Secret.create({
            orderId: order.id,
            secret_value_encrypted: JSON.stringify(encryptedSecret),
            expires_at: expiresAt
        });

        await order.update({ status: 'approved' });

        // Send email to user
        await sendOrderApprovedEmail(order.user.email, order.user.name, rawSecret, expiresAt);

        res.send({ message: "Order approved successfully." });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.rejectOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await Order.findByPk(orderId, { include: ["user"] });
        if (!order) {
            return res.status(404).send({ message: "Order not found." });
        }

        await order.update({ status: 'rejected' });

        // Send email to user
        await sendOrderRejectedEmail(order.user.email, order.user.name);

        res.send({ message: "Order rejected." });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getSecret = async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await Order.findOne({ where: { id: orderId, userId: req.userId } });
        if (!order || order.status !== 'approved') {
            return res.status(404).send({ message: "Secret not found or order not approved." });
        }

        const secret = await Secret.findOne({ where: { orderId: order.id } });
        if (!secret) {
            return res.status(404).send({ message: "Secret not found." });
        }

        // Check for expiry
        if (new Date(secret.expires_at) < new Date()) {
            await order.update({ status: 'expired' });
            return res.status(410).send({ message: "Secret has expired." });
        }

        const decryptedSecret = decrypt(JSON.parse(secret.secret_value_encrypted));

        res.send({ secret: decryptedSecret, expires_at: secret.expires_at });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
