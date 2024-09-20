import cron from "node-cron"
import NotificationService from "../services/notificationService"

cron.schedule("0 0 * * *", () => {
    NotificationService()
})