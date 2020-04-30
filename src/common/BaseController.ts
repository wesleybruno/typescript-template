import { Response, Request } from 'express';


export type IControllerMethodType = {
    auth: Object,
    fn: (req: Request, resp: Response) => Promise<any>
};

export type ControllerMethodType = {
    schema: Object,
    fn: (req: Request, resp: Response) => Promise<any>
};


export default class BaseController {


    Ok(resp: Response, result: any) {
        resp.status(200).send({
            r: true,
            data: result
        })
    }

    OkOnlyData(resp: Response, result: any) {
        resp.status(200).send(result)
    }

    Fail(resp: Response, errors: Array<string>) {
        resp.status(200).send({
            r: false,
            errors: errors
        })
    }

    BadRequest(resp: Response, errors: any) {

        const errorType = errors?.name
        let error = null;

        switch (errorType) {
            case ('ValidationError'):
                error = errors.errors
                break;
            default:
                error = errors
                break;

        }

        resp.status(400).send({
            r: false,
            errors: error
        })
    }

    schemaError(resp: Response, error: any) {
        resp.status(400).send({
            r: false,
            error: error
        })
    }

    ServerError(resp: Response, ex: Error) {
        const message = typeof ex == 'string' ? ex : `${ex.message}\n ${ex.stack}`
     
        console.error(ex);

        resp.status(500).send({
            ex: message
        })

    }

}