import { controller, IAppController } from '@foal/core';

import { ApiController, UserController } from './controllers';

export class AppController implements IAppController {
  subControllers = [
    controller('/api', ApiController),
    controller('/api/user', UserController)
  ];
}
