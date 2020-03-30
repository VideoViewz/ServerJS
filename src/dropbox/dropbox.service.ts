import { Injectable } from '@nestjs/common';
import { Dropbox } from 'dropbox';
import { config } from 'dotenv';
import { FileData } from 'src/file-data.interface';
const fetch = require('isomorphic-fetch');

config(); // load data from .env

@Injectable()
export class DropboxService {
  private dbx: Dropbox = new Dropbox({
    accessToken: process.env.ACCESS_TOKEN,
    fetch,
  });

  findAllUsers() {
    return this.dbx
      .usersGetCurrentAccount()
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  uploadFile(file: FileData) {
    this.dbx
      .filesUpload({ path: '/' + file.name, contents: file.data })
      .then(response => {
        console.log(response);
      });
  }
}
