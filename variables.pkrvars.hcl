aws_region = "us-east-1"
dev_account_id = "730190904282"
demo_account_id = "192072421737"
ami_name = "csye6225_"
ssh_username = "admin"
amazon_source_name = "github.com/hashicorp/amazon"
amazon_source_version = ">= 1.2.0"
ami_description = "AMI for CSYE 6225"
source_ami = "ami-06db4d78cb1d3bbf9"
date_format = "YYYY_MM_DD_hh_mm_ss"
instance_type = "t2.micro"
device_name = "/dev/xvda"
volume_size = 8
volume_type = "gp2"
build_source = "source.amazon-ebs.my-ami"
zip_file_src = "webapp.zip"
zip_file_dest = "/home/admin/webapp.zip"
csv_file_src = "util/users.csv"
csv_file_dest = "/home/admin/users.csv"
shell_setup_script = "setup.sh"
delay_seconds = 120
max_attempts  = 50

