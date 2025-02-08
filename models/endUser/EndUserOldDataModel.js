const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      firstName: {
        type: String,
        trim: true,
        required: true,
      },
      lastName: {
        type: String,
        trim: true,
        required: true,
      },
      fullName: {
        type: String,
        trim: true,
        required: true,
      },
    },
    userEmail: {
      currentEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      isCurrentEmailVerified: {
        type: Boolean,
        required: true,
        unique: false,
        lowercase: true,
        default: false,
        trim: true,
      },
      oldEmails: [
        {
          email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
          },
          isEmailVerified: {
            type: Boolean,
            required: true,
            unique: false,
            lowercase: true,
            default: false,
            trim: true,
          },
        },
      ],
    },

    userMobile: {
      countryCode: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        trim: true,
      },
      mobile: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      isMobileVerified: {
        type: Boolean,
        required: true,
        unique: false,
        default: false,
        lowercase: true,
        trim: true,
      },
    },

    password: {
      passwordHash: {
        type: String,
        required: true,
      },
      oldPasswordHash: {
        type: String,
        required: true,
      },
      moreOldPasswordHash: [
        {
          type: String,
          required: true,
        },
      ],
    },

    profilePicture: {
      currentURL: {
        type: String,
        required: false,
        trim: true,
        unique: true,
      },
      oldURL: [
        {
          type: String,
          required: false,
          trim: true,
          unique: true,
        },
      ],
    },
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "banned"],
      default: "active",
    },
    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
      language: {
        type: String,
        default: "en",
      },
      notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
        push: { type: Boolean, default: true },
      },
    },
    security: {
      twoFactorEnabled: { type: Boolean, default: false },
      recoveryCodes: [{ type: String }], // Store hashed recovery codes
    },
    lastLogin: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EndUser", UserSchema);
