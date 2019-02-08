import multer from 'multer';
import { Router } from 'express';
import { getLogger } from '../lib/get-logger';
import { getRequestHandler } from '../utils/request';

import * as libraryService from '../service/library-service';
// import { ensureAuthentication } from '../utils/middleware';

const library = Router(); // eslint-disable-line new-cap
const upload = multer({ storage: multer.memoryStorage() });
const logger = getLogger('library');
const handleRequest = getRequestHandler(logger);

// library.use(ensureAuthentication);

library.get(
  '/files/:fileId',
  handleRequest(async (req, res) => {
    const result = await libraryService.getPage(req.params.fileId);
    return res.send(result);
  })
);

library.get(
  '/files',
  handleRequest(async (_, res) => {
    const result = await libraryService.getStrippedDirectories();
    return res.send(result);
  })
);

library.get(
  '/:projectName/*',
  handleRequest(async (req, res) => {
    const filePath = await libraryService.getProjectFile(
      req.params.projectName + '/' + req.params[0]
    );
    return res.sendFile(filePath);
  })
);

library.post(
  '/upload/zip',
  upload.single('file'),
  [],
  handleRequest(async (req, res) => {
    return res.send(
      await libraryService.uploadZip(req.file, req.body.directoryName)
    );
  })
);

library.post(
  '/upload/images',
  upload.array('files'),
  [],
  handleRequest(async (req, res) => {
    return res.send(await libraryService.uploadImages(req.files));
  })
);

export default library;
