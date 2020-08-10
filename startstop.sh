#!/bin/bash
#
# Author: Darryll Robinson
# Purpose: Used to stop and start The System database server

WORKINGDIR="/opt/apps/thesystem"
APP="server-linux"
PID=`pidof ${APP}`
LOGFILE="${APP}.log"

checkuser() {

   if [ `whoami` != "root" ]
    then
      echo "This script must be run as root"
      exit 0
   fi

}

start() {

   if [ -z ${PID} ]
    then
     echo "Starting process..."
     sleep 1
     cd ${WORKINGDIR}
     export REACT_APP_STAGE=production
     chmod +x ${APP}
     nohup ./${APP} > ${LOGFILE} 2>&1 &
     netstat -tulpn
     echo "Process started!"
    else
     echo "Process already running!"
    fi

}

stop() {

   if [ -z ${PID} ]
    then
     echo "Process not running!"
    else
     echo "Stopping process..."
     sleep 1
     kill -9 ${PID}
     sleep 2
     echo "Process stopped!"
    fi

}

status() {

   if [ -z ${PID} ]
    then
     echo "Process not running!"
    else
     echo "Process is running..."
    fi

}

case "$1" in
  start)
    checkuser
    start
    ;;
  stop)
   checkuser
    stop
    ;;
  status)
    checkuser
    status
    ;;
  restart)
    checkuser
    stop
    start
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|status}"
esac

exit 0
