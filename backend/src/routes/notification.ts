import express from "express"
import jwtAuth from "../middleware/jwtAuth";
import NotificationRepository from "../repositories/notificationRepository";
import Notification from "../model/notification";
import ErrorMessage from "../model/error";
import NotificationMapper from "../mappers/notificationMapper";
import { isObjectIdValid } from "../util/validate";
import { readNotification } from "../services/notificationService";

const notificationRouter = express.Router();
const notificationRepository = new NotificationRepository();

notificationRouter.get("/", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    let notifications: Notification[];

    try {
        notifications = await notificationRepository.getNotifications(request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!notifications) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(notifications.map(notification => NotificationMapper.ToNotificationDto(notification)));
})

notificationRouter.get("/:id", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const notificationId = request.params.id;
    if (!isObjectIdValid(notificationId)) {
        return response.status(400).send(ErrorMessage.ObjectIdError);
    }

    let notification: Notification;

    try {
        notification = await notificationRepository.getNotification(request.account._id, notificationId);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!notification) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(NotificationMapper.ToNotificationDto(notification));
})


notificationRouter.delete("/:id", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const notificationId = request.params.id;
    if (!isObjectIdValid(notificationId)) {
        return response.status(400).send(ErrorMessage.ObjectIdError);
    }

    let notification: Notification;

    try {
        notification = await notificationRepository.deleteNotification(request.account._id, notificationId);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!notification) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(NotificationMapper.ToNotificationDto(notification));
})


notificationRouter.post("/:id/read", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const notificationId = request.params.id;
    if (!isObjectIdValid(notificationId)) {
        return response.status(400).send(ErrorMessage.ObjectIdError);
    }

    let notification: Notification;

    try {
        notification = await readNotification(notificationId, request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!notification) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(NotificationMapper.ToNotificationDto(notification));
})


export default notificationRouter;