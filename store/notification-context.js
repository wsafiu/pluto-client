import { createContext, useState } from 'react'

const NotificationContext = createContext({
    notification: null,
    showNotification: function (notificationData) {},
    hideNotification: function () {}
})

export function NotificationContextProvider(props) {
    const [activeNotification, setActiveNotification ] = useState(null);

    function showNotificationHandler (notificationData){
        setActiveNotification(notificationData)
        setTimeout(hideNoficationHandler, 5000)
    }

    function hideNoficationHandler () {
        setActiveNotification(null)
    }

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNoficationHandler
    }
     return(
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext;