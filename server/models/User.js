
const mongoose = require('mongoose');
const _ = require('lodash');
const {
    RoleList,
    StatusList,
    isAdmin,
    isStudent,
    Student,
    Active,
    generateSlug,
    ucFirst,
} = require('../utils/user');

const bcrypt = require('../utils/bcrypt');

const { Schema } = mongoose;

const mongoSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        sparse: true,
    },
    password: {
        type: String,
        // required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: StatusList,
        required: true,
    },
    role: {
        type: String,
        enum: RoleList,
        required: true,
    },
    provider: {
        type: String,
    },

    address: {
        streetName: String,
        city: String,
        country: String,
        postalCode: String,
    },
    dateOfBirth: Date,
});

class UserClass {
    static publicFields() {
        return [
            '_id',
            'firstName',
            'lastName',
            'email',
            'slug',
            'role',
            'status',
            'address',
            'dateOfBirth',
        ];
    }

    /**
     * List a limited amount of Users
     * @param {Object} [where] - Filtering criterias
     * @param {Object} [options]
     * @param {Number} [options.offset] - Amount of Users to skip
     * @param {Number} [options.limit] - Amount of Users to return
     */
    static async list(where = {}, { offset = 0, limit = 10 } = {}) {
        const users = await this.find(where)
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .select(this.publicFields())
            .lean();
        return { users };
    }

    static async getId(where) {
        const user = await this.findOne(where)
            .select('_id')
            .lean();
        if (!user) {
            return { userId: null };
        }
        return { userId: user._id };
    }

    static async getIdBySlug({ slug }) {
        return this.getId({ slug });
    }

    static async listStudents(options) {
        const { users: students } = await this.list({ role: Student }, options);
        return { students };
    }

    static async add({ email, password, firstName, lastName, role, picture }) {
        const slug = await generateSlug(this, firstName + lastName);
        const status = Active; // Change to Enum Value

        const user = await this.create({
            email,
            password,
            slug,
            firstName,
            lastName,
            status,
            role,
            picture
        });

        if (email) {
            // Send Email
        }

        return { user };
    }

    /**
     * Get a User by its slug
     * @param {Object} params
     * @param {String} params.slug - The slug of the User to get
     */
    static async getBySlug({ slug }) {
        const userDoc = await this.findOne({ slug })
            .select(this.publicFields());
        if (!userDoc) {
            throw new Error('User not found');
        }
        const user = userDoc.toObject();
        return { user };
    }

    /**
     * Update a User by its slug
     * @param {Object} params
     * @param {String} params.slug - The slug of the User to get
     * @param {...Object} params.updates - The updates to apply
     * @todo Validate updates
     */
    static async updateBySlug({ slug, ...updates }) {
        const userDoc = await this.findOne({ slug });
        if (!userDoc) {
            throw new Error('User not found');
        }
        Object.entries(updates)
            .filter(([key, value]) => value !== undefined && !['influencer'].includes(key))
            .forEach(([key, value]) => {
                userDoc[key] = value;
            });
        await userDoc.save();
        const user = _.pick(userDoc.toObject(), this.publicFields());
        return { user };
    }

    static async signInOrSignUpViaSocialMedia({
        role,
        email,
        password,
        provider,
        avatarUrl,
        firstName,
        lastName,
    }) {

        let user = await this.findOne({ email });

        if (!user) {
            user = (await this.add({
                role,
                email,
                password,
                firstName,
                provider,
                lastName,
                picture: avatarUrl,
            })).user;
        }
        user = user.toObject();
        return _.pick(user, this.publicFields());
    }

    static async signInOrSignUpViaEmail({ email, password, avatarUrl, firstName, lastName, role }) {
        let user = await this.findOne({ email });

        if (!user) {
            user = (await this.add({
                email,
                password,
                firstName,
                lastName,
                role,
                picture: avatarUrl,
            })).user;
            user = user.toObject();
            return _.pick(user, this.publicFields());
        }
        if (!user.password) {
            throw new Error('Account has no password.');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        user = user.toObject();
        if (isMatch) return _.pick(user, this.publicFields());
        throw new Error('Invalid password');
    }

    static async signInOrSignUp(options) {
        const { email, password, provider, socialUserId, token } = options;

        if (provider && socialUserId && token) {
            return this.signInOrSignUpViaSocialMedia(options);
        }
        if (email && password) {
            return this.signInOrSignUpViaEmail(options);
        }
        throw new Error(
            'Invalid SignIn/Up method, either use email + password or use social media login.',
        );
    }
}
mongoSchema.loadClass(UserClass);

mongoSchema.pre('save', async function userPreSavePassword() {
    const user = this;

    user.firstName = ucFirst(user.firstName)
    user.lastName = ucFirst(user.lastName)
    if (!user.password || !user.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});


const User = mongoose.model('User', mongoSchema);

module.exports = User;