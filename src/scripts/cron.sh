#!/bin/zsh 
export PID=22487
export NODE_VERSION="v19.2.0" # @todo: use "$(nvm version)"

if ps -p $PID > /dev/null
    then
        echo "$PID is running, skipping."
        # Do something knowing the pid exists, i.e. the process with $PID is running
        return 1;
    else
        $HOME/.nvm/versions/node/$NODE_VERSION/bin/node $HOME/YouTubeTelegramChannel/src/bots/notification.bot.js --use_strict & PID=$!
        sed -i.bak -E "s/=[0-9]+/=$PID/" $HOME/YouTubeTelegramChannel/src/scripts/cron.sh
        # echo "#!/bin/zsh \n export PID=$PID"|cat - $HOME/YouTubeTelegramChannel/src/scripts/cron.sh > /tmp/out && mv /tmp/out $HOME/YouTubeTelegramChannel/src/scripts/cron.sh
fi

# * * * * * /path/to/node /Users/your user/YouTubeTelegramChannel/src/bot.js && ko && killall node
# * * * * * . $HOME/YouTubeTelegramChannel/src/scripts/cron.sh
# 2 0 12 * * * cd $HOME/YouTubeTelegramChannel/src/scripts/ && zsh backup-db.sh


# Reference
# https://stackoverflow.com/questions/5171901/find-and-replace-in-file-and-overwrite-file-doesnt-work-it-empties-the-file
# https://stackoverflow.com/questions/12351702/how-to-write-a-bash-script-to-set-global-environment-variable

# Sample
# * * * * * . /Users/hector.ceron/YouTubeTelegramChannel/src/scripts/cron.sh
# 0 0,8,16 * * * cd /Users/hector.ceron/YouTubeTelegramChannel/src/scripts/ && zsh backup-db.sh
