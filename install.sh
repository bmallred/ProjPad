# Update system packages
sudo apt-get update

# Install distributed version control systems
sudo apt-get install git
sudo apt-get install mercurial

# Install Apache web server and modules
sudo apt-get install apache2
sudo apt-get install libapache2-mod-python
sudo apt-get install libapache2-mod-wsgi

# Install Trac and plug-ins or patches
sudo apt-get install trac
sudo apt-get install trac-accountmanager
sudo apt-get install trac-authopenid
sudo apt-get install trac-bitten
sudo apt-get install trac-customfieldadmin
sudo apt-get install trac-git
sudo apt-get install trac-graphviz
sudo apt-get install trac-mastertickets
sudo apt-get install trac-mercurial
sudo apt-get install trac-wikiprint
sudo apt-get install trac-wikirename
sudo apt-get install trac-wysiwyg
sudo apt-get install trac-xmlrpc

# Create directory structure
sudo mkdir /var/lib/hg
sudo mkdir /var/lib/git
sudo mkdir /var/lib/trac

# Transfer files
sudo cp -R ./apache/cgi-bin/* /usr/lib/cgi-bin/
sudo cp -R ./apache/sites-available/* /etc/apache2/sites-available/
sudo cp -R ./www/* /var/www/
sudo cp ./util/* /usr/bin/

# Configure Agile-Trac
sudo easy_install http://svn.agile-trac.org/BRANCH/AGILE-TRAC/SOURCE/0.11/REL/
sudo mv /usr/lib/python2.6/dist-packages/trac /usr/lib/python2.6/dist-packages/trac-orig
sudo svn co http://svn.agile-trac.org/BRANCH/AGILE-TRAC/SOURCE/0.11/REL/patch/trac/ /usr/lib/python2.6/dist-packages/trac

# Configure sites available
sudo rm /etc/apache2/sites-enabled/* 
cd /etc/apache2/sites-enabled; sudo ln -s ../sites-available/devel .
cd /etc/apache2/sites-enabled; sudo ln -s ../sites-available/devel-ssl .
cd /etc/apache2/mods-enabled; sudo ln -s ../mods-available/ssl.conf .
cd /etc/apache2/mods-enabled; sudo ln -s ../mods-available/ssl.load .

# Configure permissions
sudo chown -R www-data:www-data /var/lib/hg
sudo chown -R www-data:www-data /var/lib/git
sudo chown -R www-data:www-data /var/lib/trac
sudo chown -R www-data:www-data /var/www

# Restart web server
sudo apache2ctl restart

# Create administrator password
echo
echo ATTENTION
echo Please execute the final command listed below to assign an
echo administrative password.
echo
echo sudo htpasswd –c /var/lib/trac/.htpasswd admin