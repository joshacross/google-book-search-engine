const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({})
                .select('__v password')
                .populate('books');

                return userData;
            }

            throw new AuthenticationError('Please Login');
        },
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('books');
        },
        books: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Book.find(params).sort({ createdAt: -1 });
        },
        book: async (parent, { bookId }) => {
            return Book.findOne({ bookId });
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Cannot find a user by the email you provided. Please try again.');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Your password is incorrect. Please try again.');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            if (context.user) {
                const book = await Book.create({ ...args, username: context.user.username});

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { books: book.bookId }},
                    { new: true}
                );

                return thought;
            }

            throw new AuthenticationError('Please login');
        }
    }
};

module.exports = resolvers;