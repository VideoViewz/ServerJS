import { Injectable } from '@nestjs/common';
import { Dropbox } from 'dropbox';
import { config } from 'dotenv';
import { FileData } from 'src/file-data.interface';
const fetch = require('isomorphic-fetch');

const BIG_FILE = 157286400;
const MAX_BLOB = 8 * 1000 * 1000;

config(); // load data from .env

@Injectable()
export class DropboxService {
  private dbx: Dropbox = new Dropbox({
    accessToken: process.env.ACCESS_TOKEN,
    fetch,
  });

  /**
   * split up a file into chuncks
   * @param file split it up to chunks
   */
  chunckMaker(file: FileData): Buffer[] {
    let offset = 0;
    const workItems = Array<Buffer>();

    while (offset < file.data.byteLength) {
      let chunkSize = Math.min(MAX_BLOB, file.data.byteLength - offset);
      workItems.push(file.data.slice(offset, offset + chunkSize));
      offset += chunkSize;
    }

    return workItems;
  }

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
      const workItems = this.chunckMaker(file);

      console.log('Starting Upload...');
      let startResponse = await this.dbx.filesUploadSessionStart({
        contents: workItems[0],
      });

      for (let index = 1; index < workItems.length; index++) {
        if (index < workItems.length - 1) {
          console.log(`Uploading item number: ${index + 1}`);
          await this.dbx
            .filesUploadSessionAppendV2({
              contents: workItems[index],
              // @ts-ignore
              cursor: {
                session_id: startResponse.session_id,
                offset: index * MAX_BLOB,
              },
            })
            .catch(console.log);
        } else {
          console.log('Uploading Last Item....');
          await this.dbx
            .filesUploadSessionFinish({
              // @ts-ignore
              commit: {
                path: '/' + file.name,
                autorename: true,
              },
              contents: workItems[index],
              // @ts-ignore
              cursor: {
                session_id: startResponse.session_id,
                offset: file.data.byteLength - workItems[index].byteLength,
              },
            })
            .catch(console.log);
        }
      }
    } else {
      return this.dbx
        .filesUpload({ path: '/' + file.name, contents: file.data })
        .then(response => {
          console.log(response);
          return response;
        });
    }
  }
}
