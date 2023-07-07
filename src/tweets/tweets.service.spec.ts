import { Test, TestingModule } from '@nestjs/testing';
import { TweetsService } from './tweets.service';

describe('TweetsService', () => {
  let service: TweetsService;

  // test 실행 전 수행해야 하는 모든 설정 작업 처리
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetsService],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTweet', () => {
    it('should create tweet', () => {
      // Arrange
      service.tweets = [];
      const payload = 'This is my tweet';

      // Act
      const tweet = service.createTweet(payload);

      // Assert
      expect(tweet).toBe(payload);
      expect(service.tweets).toHaveLength(1);
    });

    it('should prevent tweetss created which are over 100 characters', () => {
      // Arrange
      const payload = 'This is a long tweet over 100 characters This is a long tweet over 100 characters This is a long t...';

      // Act
      const tweet = () => {
        return service.createTweet(payload);
      }

      // Assert
      expect(tweet).toThrowError();
    });

  })


  describe('updateTweet', () => {
    it('should update tweet', () => {
      service.tweets = ['This is my tweet'];
      const id = 0;

      const tweet = service.updateTweet('update tweet', id);

      expect(tweet).toBe('update tweet');
      expect(service.tweets[id]).toBe('update tweet');
    });


    it('should prevent tweetss created which are over 100 characters', () => {
      // Arrange
      service.tweets = ['This is my tweet'];
      const payload = 'This is a long tweet over 100 characters This is a long tweet over 100 characters This is a long t...';
      const id = 0;
      // Act
      const tweet = () => {
        return service.updateTweet(payload, id);
      }

      // Assert
      expect(tweet).toThrowError();
    })


    it('should prevent updating not exist tweet', () => {
      service.tweets = ['This is my tweet'];
      const tweet = 'update tweet';
      const id = 1;

      const result = () => {
        return service.updateTweet(tweet, id);
      }

      expect(result).toThrowError();
    });
  })

  describe('getTweets', () => {

    it('should return tweets', () => {
      service.tweets = ['This is my tweet', 'update tweet'];

      const tweets = service.getTweets();

      tweets.forEach((tweet) => expect(typeof tweet).toBe('string'))

      expect(tweets.length).toBe(service.tweets.length)
    });
  })


  describe('deleteTweet', () => {
    it('should return tweet deleted', () => {
      service.tweets = ['This is my tweet'];
      const id = 0

      const tweet = service.deleteTweet(id);

      expect(tweet).toBe('This is my tweet')
      expect(service.tweets[id]).toBe(undefined)
      expect(service.tweets.length).toBe(0)
    });

    it('should prevent deleting not exist tweet', () => {
      service.tweets = ['This is my tweet'];
      const id = 1;

      const result = () => {
        return service.deleteTweet(id);
      }

      expect(result).toThrowError();
    });

  })
});
