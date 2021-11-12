import MetadataKeys from '../../utils/metadata.keys';

export enum Methods {
  GET = 'get',
  PUT = 'put',
  POST = 'post',
  DELETE = 'delete',
}

export interface IRouter {
  method: Methods;
  middlewares?: any[];
  handlerPath: string;
  handlerName: string | symbol;
}

const decoratorFactory =
  (method: Methods) =>
  (path: string, middlewares?: any[]): MethodDecorator =>
  (target, propertyKey) => {
    const controllerClass = target.constructor;

    const routers: IRouter[] = Reflect.hasMetadata(
      MetadataKeys.ROUTERS,
      controllerClass,
    )
      ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
      : [];

    routers.push({
      method,
      middlewares,
      handlerPath: path,
      handlerName: propertyKey,
    });

    Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
  };

export const Get = decoratorFactory(Methods.GET);
export const Put = decoratorFactory(Methods.PUT);
export const Post = decoratorFactory(Methods.POST);
export const Delete = decoratorFactory(Methods.DELETE);
