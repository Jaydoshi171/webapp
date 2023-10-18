packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = ">= 1.2.0"
    }
  }
}

variable "AWS_AMI_REGION" {
  type    = string
  default = "${env("AWS_AMI_REGION")}"
}

variable "MARIADB_USER" {
  type    = string
  default = "${env("MARIADB_USER")}"
}

variable "MARIADB_PASSWORD" {
  type    = string
  default = "${env("MARIADB_PASSWORD")}"
}

variable "MYSQL_DB_NAME" {
  type    = string
  default = "${env("MYSQL_DB_NAME")}"
}

variable "ami_description" {
  type    = string
  default = null
}

variable "source_store_name" {
  type    = string
  default = null
}

variable "amazon_source_version" {
  type    = string
  default = null
}

variable "shell_setup_script" {
  type    = string
  default = null
}

variable "aws_region" {
  type    = string
  default = null
}


variable "max_attempts" {
  type    = string
  default = null
}


variable "ssh_username" {
  type    = string
  default = null
}

variable "amazon_source_name" {
  type    = string
  default = null
}

variable "zip_file_dest" {
  type    = string
  default = null
}

variable "date_format" {
  type    = string
  default = null
}

variable "csv_file_dest" {
  type    = string
  default = null
}

variable "volume_size" {
  type    = string
  default = null
}

variable "dev_account_id" {
  type    = string
  default = null
}

variable "ami_name" {
  type    = string
  default = null
}

variable "build_source" {
  type    = string
  default = null
}

variable "delay_seconds" {
  type    = string
  default = null
}

variable "source_ami" {
  type    = string
  default = null
}

variable "source_name" {
  type    = string
  default = null
}

variable "instance_type" {
  type    = string
  default = null
}

variable "volume_type" {
  type    = string
  default = null
}

variable "zip_file_src" {
  type    = string
  default = null
}

variable "device_name" {
  type    = string
  default = null
}

variable "csv_file_src" {
  type    = string
  default = null
}

variable "demo_account_id" {
  type    = string
  default = null
}

# https://www.packer.io/plugins/builders/amazon/ebs
source "amazon-ebs" "my-ami" {
  region          = "${var.AWS_AMI_REGION}"
  ami_name        = "${var.ami_name}${formatdate("${var.date_format}", timestamp())}"
  ami_description = "${var.ami_description}"
  ami_regions     = ["${var.AWS_AMI_REGION}", ]
  ami_users       = ["${var.dev_account_id}", "${var.demo_account_id}"]

  aws_polling {
    delay_seconds = "${var.delay_seconds}"
    max_attempts  = "${var.max_attempts}"
  }

  instance_type = "${var.instance_type}"
  source_ami    = "${var.source_ami}"
  ssh_username  = "${var.ssh_username}"

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "${var.device_name}"
    volume_size           = "${var.volume_size}"
    volume_type           = "${var.volume_type}"
  }
}

build {
  sources = ["source.amazon-ebs.my-ami"]

  provisioner "file" {
    source      = "${var.zip_file_src}"
    destination = "${var.zip_file_dest}"
  }

  provisioner "file" {
    source      = "${var.csv_file_src}"
    destination = "${var.csv_file_dest}"
  }

  provisioner "shell" {
    script = "${var.shell_setup_script}"
    environment_vars = [
      "MARIA_PASSWORD=${var.MARIADB_PASSWORD}",
      "MYSQL_DB_NAME=${var.MYSQL_DB_NAME}",
      "MARIA_USER=${var.MARIADB_USER}",
    ]
  }
}