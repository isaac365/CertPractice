import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const studyQuestions = new Mongo.Collection('questions');

if (Meteor.isServer) {
  Meteor.publish('questions', function () {

    // TO ONLY RETURN USERS QUESTIONS: return studyQuestions.find({userId: this.userId});
    return studyQuestions.find({});
  });
}

Meteor.methods({
  'questions.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return studyQuestions.insert({
      question: '',
      answer1: '',
      wrong1: '',
      wrong2: '',
      wrong3: '',
      userId: this.userId,
      updatedAt: moment().valueOf()
    });
  },
  'questions.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({_id});

    studyQuestions.remove({_id, userId: this.userId});
  },
  'questions.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      question: {
        type: String,
        optional: true
      },
      answer1: {
        type: String,
        optional: true
      },
      wrong1: {
        type: String,
        optional: true
      },
      wrong2: {
        type: String,
        optional: true
      },
      wrong3: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      ...updates
    });

    studyQuestions.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });
  }
});