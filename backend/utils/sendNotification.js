import Notification from '../models/Notification.js';

const sendNotification = async (userId, message) => {
  try {
    await Notification.create({
      userId,
      message,
    });
  } catch (error) {
    console.error(`Notification Error: ${error.message}`);
  }
};

export default sendNotification;
