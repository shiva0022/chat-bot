import express from 'express';
import passport from 'passport';
import Chat from '../models/Chat.js';

const router = express.Router();

// Middleware to ensure user is authenticated
const authenticate = passport.authenticate('jwt', { session: false });

// Get all chats for the current user
router.get('/', authenticate, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.userId })
      .sort({ updatedAt: -1 })
      .select('title createdAt updatedAt');
    res.json(chats);
  } catch (error) {
    console.error('Get chats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific chat
router.get('/:chatId', authenticate, async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.chatId,
      userId: req.user.userId
    });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.json(chat);
  } catch (error) {
    console.error('Get chat error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new chat
router.post('/', authenticate, async (req, res) => {
  try {
    const { title } = req.body;
    const chat = new Chat({
      userId: req.user.userId,
      title: title || 'New Chat',
      messages: []
    });

    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    console.error('Create chat error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a message to a chat
router.post('/:chatId/messages', authenticate, async (req, res) => {
  try {
    const { content, sender } = req.body;
    const chat = await Chat.findOne({
      _id: req.params.chatId,
      userId: req.user.userId
    });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    chat.messages.push({
      content,
      sender
    });

    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    console.error('Add message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a chat
router.delete('/:chatId', authenticate, async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({
      _id: req.params.chatId,
      userId: req.user.userId
    });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.json({ message: 'Chat deleted successfully' });
  } catch (error) {
    console.error('Delete chat error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 