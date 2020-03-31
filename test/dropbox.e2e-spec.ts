import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/dropbox/retrieve (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/dropbox/retrieve')
      .query({ video: 'Armin ft BT - Nation of the Always.mp4' });

    expect(response.status).toBe(200);
    expect(
      response.text.startsWith('https://dl.dropboxusercontent.com'),
    ).toBeTruthy();
  });
});
