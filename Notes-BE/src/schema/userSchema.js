import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    avatarId: {
      type: Number,
      default: 1,
    },
    firstName: {
      type: String,
      required: true,
      minlength: 3,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    resetToken: {
      type: String,
    },

    resetTokenExpiresAt: {
      type: Date,
    },
    userName: {
      type: String,
    },
    bio: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    emailNotification: {
      type: Boolean,
      default: false,
    },
    browserNotification: {
      type: Boolean,
      default: false,
    },
    gitHub: {
      username: {
        type: String,
      },
      avatarUrl: {
        type: String,
      },
      profileUrl: {
        type: String,
      },
      bio: {
        type: String,
      },
      publicRepos: {
        type: Number,
      },
      followers: {
        type: Number,
      },
      following: {
        type: Number,
      },
      verified: {
        type: Boolean,
        default: false,
      },
      connectedAt: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("User", userSchema);
