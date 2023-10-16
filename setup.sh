#!/bin/sh
sudo apt-get update
sudo apt-get upgrade -y
sudo apt install unzip
sudo apt install nodejs npm -y
sudo apt install mariadb-server -y
sudo mysql -e "SET PASSWORD FOR root@localhost = PASSWORD('Jay@1998');FLUSH PRIVILEGES;"
printf 'Jay@1998\n n\n n\n n\n n\n n\n y\n' | sudo mysql_secure_installation
sudo mysql -e "GRANT ALL PRIVILEGES ON healthCheck.* TO 'root'@'localhost' IDENTIFIED BY 'Jay@1998';"
mysql -u root -pJay@1998 -Bse "CREATE DATABASE healthCheck;"
mysql -u root -pJay@1998 -Bse "SHOW DATABASES;"
sudo mkdir opt
sudo mv /home/admin/webapp.zip /home/admin/opt/webapp.zip
sudo mv /home/admin/users.csv /home/admin/opt/users.csv
cd opt
sudo unzip -o webapp.zip
cd webapp
sudo npm i
# sudo npm start