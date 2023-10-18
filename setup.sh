#!/bin/sh
sudo apt-get update
sudo apt-get upgrade -y
sudo apt install unzip
sudo apt install nodejs npm -y
sudo apt install mariadb-server -y
# echo "USER_PASSWORD: ${MARIA_PASSWORD}"
# echo "MYSQL_DB_NAME: ${MYSQL_DB_NAME}"
# echo "USER_PMYSQL_USERASSWORD: ${MYSQL_USER}"
sudo mysql -e "SET PASSWORD FOR $MARIA_USER@localhost = PASSWORD('$MARIA_PASSWORD');FLUSH PRIVILEGES;"
printf "%s\n n\n n\n n\n n\n n\n y\n" "$MARIA_PASSWORD" | sudo mysql_secure_installation
mysql -u "$MARIA_USER" -p"$MARIA_PASSWORD" -Bse "CREATE DATABASE $MYSQL_DB_NAME;"
sudo mysql -e "GRANT ALL PRIVILEGES ON $MYSQL_DB_NAME.* TO '$MARIA_USER'@'localhost' IDENTIFIED BY '$MARIA_PASSWORD';"
mysql -u "$MARIA_USER" -p"$MARIA_PASSWORD" -Bse "SHOW DATABASES;"
sudo mkdir opt
sudo mv /home/admin/webapp.zip /home/admin/opt/webapp.zip
sudo mv /home/admin/users.csv /home/admin/opt/users.csv
cd opt
sudo unzip -o webapp.zip
# cd webapp
sudo npm i
# mysql -u "$MARIA_USER" -p"$MARIA_PASSWORD" -Bse "SHOW DATABASES;"
# sudo npm start