#!/bin/sh
sudo apt-get update
sudo apt-get upgrade -y
sudo apt install unzip
sudo apt install nodejs npm -y

sudo groupadd "$APPLICATION_USER"
sudo useradd -s /bin/false -g "$APPLICATION_USER" -d "/opt/$APPLICATION_USER" -m "$APPLICATION_USER"
# sudo mkdir opt
sudo mv /home/admin/webapp.zip "/opt/$APPLICATION_USER/webapp.zip"
sudo mv /home/admin/users.csv "/opt/$APPLICATION_USER/users.csv"
cd "/opt/$APPLICATION_USER"
sudo unzip -o webapp.zip
sudo npm i

sudo cp /home/admin/application.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable application.service
sudo systemctl start application.service