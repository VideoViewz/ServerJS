import { Injectable } from '@nestjs/common';
import { Dropbox } from 'dropbox';
import { config } from 'dotenv';
import { FileData } from 'src/file-data.interface';
import e = require('express');
const fetch = require('isomorphic-fetch');

const BIG_FILE = 157286400;

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

  async uploadFile(file: FileData) {
    console.log(file.data.byteLength);
    if (file.data.byteLength >= BIG_FILE) {
      const maxBlob = 8 * 1000 * 1000;
      let offset = 0;
      let workItems = Array<Buffer>();

      while (offset < file.data.byteLength) {
        let chunkSize = Math.min(maxBlob, file.data.byteLength - offset);
        workItems.push(file.data.slice(offset, offset + chunkSize));
        offset += chunkSize;
      }

      let hello = await this.dbx.filesUploadSessionStart({
        contents: workItems[0],
      });

      for (let index = 0; index < workItems.length; index++) {
        if (index == 0) console.log('First');
        else if (index < workItems.length - 1) {
          console.log(`Uploading item number: ${index + 1}`);
          await this.dbx
            .filesUploadSessionAppendV2({
              contents: workItems[index],
              cursor: {
                session_id: hello.session_id,
                offset: index * maxBlob,
              },
            })
            .catch(console.log);
        } else {
          console.log('Uploading Last Item....');
          await this.dbx
            .filesUploadSessionFinish({
              commit: {
                path: '/' + file.name,
                autorename: true,
              },
              contents: workItems[index],
              cursor: {
                session_id: hello.session_id,
                offset: file.data.byteLength - workItems[index].byteLength,
              },
            })
            .catch(console.log);
        }
      }
    } else {
      this.dbx
        .filesUpload({ path: '/' + file.name, contents: file.data })
        .then(response => {
          console.log(response);
        });
    }
  }
}
