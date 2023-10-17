packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = ">= 1.2.0"
    }
  }
}

variable "aws_region" {
  type    = string
  default = env("AWS_AMI_REGION")
}

variable "source_ami" {
  type    = string
  default = "ami-06db4d78cb1d3bbf9" # Debian 12
}

variable "ssh_username" {
  type    = string
  default = "admin"
}

variable "subnet_id" {
  type    = string
  default = "subnet-0e515761f4b2c66c1"
}

# https://www.packer.io/plugins/builders/amazon/ebs
source "amazon-ebs" "my-ami" {
  region          = "${var.aws_region}"
  ami_name        = "csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  ami_description = "AMI for CSYE 6225"
  ami_regions = [
    "us-east-1",
  ]

  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }

  instance_type = "t2.micro"
  source_ami    = "${var.source_ami}"
  // source_ami_filter {
  //   most_recent = true
  //   filters = {
  //     name                = "debian-12-amd64*"
  //     architecture        = "x86_64"
  //     root-device-name    = "/dev/xvda"
  //     root-device-type    = "ebs"
  //     virtualization-type = "hvm"
  //   }
  //   owners = ["amazon"]
  // }
  ssh_username = "${var.ssh_username}"
  //   subnet_id     = "${var.subnet_id}"

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/xvda"
    volume_size           = 8
    volume_type           = "gp2"
  }
}

build {
  sources = ["source.amazon-ebs.my-ami"]

  provisioner "file" {
    source      = "webapp.zip"
    destination = "/home/admin/webapp.zip"
  }

  provisioner "file" {
    source      = "util/users.csv"
    destination = "/home/admin/users.csv"
  }

  provisioner "shell" {
    script = "setup.sh"
    environment_vars = [
      "MARIA_PASSWORD=${env("MARIADB_PASSWORD")}",
      "MYSQL_DB_NAME=${env("MYSQL_DB_NAME")}",
      "MARIA_USER=${env("MARIADB_USER")}",
    ]
    // pause_before = "10s"
  }

}