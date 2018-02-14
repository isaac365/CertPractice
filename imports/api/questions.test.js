import {Meteor} from 'meteor/meteor';
import expect from 'expect';

import {studyQuestions} from './questions';

if (Meteor.isServer) {
  describe('questions', function () {
    const questionOne = {
      _id: 'testQuestionId1',
      question: 'My question',
      answer1: 'My answer for question',
      wrong1: 'wrong answer 1',
      wrong2: 'wrong answer 2',
      wrong3: 'wrong answer 3',
      updatedAt: 0,
      userId: 'testUserId1'
    };
    const questionTwo = {
      _id: 'testQuestionId2',
      question: 'My question 2',
      answer1: 'answer 2',
      wrong1: '2wrong answer 1',
      wrong2: '2wrong answer 2',
      wrong3: '2wrong answer 3',
      updatedAt: 0,
      userId: 'testUserId2'
    };

    beforeEach(function () {
      studyQuestions.remove({});
      studyQuestions.insert(questionOne);
      studyQuestions.insert(questionTwo);
    });

    it('should insert new question', function () {
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['questions.insert'].apply({userId});

      expect(studyQuestions.findOne({_id, userId})).toExist();
    });

    it('should not insert question if not authenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['questions.insert']();
      }).toThrow();
    });

    it('should remove question', function () {
      Meteor.server.method_handlers['questions.remove'].apply({userId: questionOne.userId}, ['testQuestionId1']);

      expect(studyQuestions.findOne({_id: questionOne._id})).toNotExist();
    });
    
    it('should not remove question if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['questions.remove'].apply({}, [questionOne._id]);
      }).toThrow();
    });

    it('should not remove question if invalid _id', function () {
      expect(() => {
        Meteor.server.method_handlers['questions.remove'].apply({userId: questionOne.userId});
      }).toThrow();
    });

    it('should update question', function () {
      const question = 'This is an updated question';

      Meteor.server.method_handlers['questions.update'].apply({
        userId: questionOne.userId
      }, [
        questionOne._id,
        {question}
      ]);

      const quest = studyQuestions.findOne(questionOne._id);

      expect(quest.updatedAt).toBeGreaterThan(0);
      expect(quest).toInclude({
        question,
        answer1: questionOne.answer1,
        wrong1: questionOne.wrong1,
        wrong2: questionOne.wrong2,
        wrong3: questionOne.wrong3
      });
    });

    it('should throw error if extra updates provided', function () {
      expect(() => {
        Meteor.server.method_handlers['questions.update'].apply({
          userId: questionOne.userId
        }, [
          questionOne._id,
          {question: 'new question', name: 'Isaac'}
        ]);
      }).toThrow();
    });

    it('should not update question if user was not creator', function () {
      const question = 'This is an updated question';

      Meteor.server.method_handlers['questions.update'].apply({
        userId: 'testid'
      }, [
        questionOne._id,
        {question}
      ]);

      const quest = studyQuestions.findOne(questionOne._id);

      expect(quest).toInclude(questionOne);
    });

    it('should not update question if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['questions.update'].apply({}, [questionOne._id]);
      }).toThrow();
    });

    it('should not update question if invalid _id', function () {
      expect(() => {
        Meteor.server.method_handlers['questions.update'].apply({userId: questionOne.userId});
      }).toThrow();
    });

    it('should return a users questions', function () {
      const res = Meteor.server.publish_handlers.questions.apply({userId: questionOne.userId});
      const questions = res.fetch();

      expect(questions.length).toBe(1);
      expect(questions[0]).toEqual(questionOne);
    });

    it('should return zero questions for user that has none', function () {
      const res = Meteor.server.publish_handlers.questions.apply({userId: 'testid'});
      const questions = res.fetch();

      expect(questions.length).toBe(0);
    });
  });
}