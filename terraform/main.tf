terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }

  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "mdzhang"

    workspaces {
      name = "mdzhang-com"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_route53_zone" "primary" {
  name = var.domain
}

module "personal_site" {
  source = "./personal_site"

  aws_region = var.aws_region
  domain     = var.domain
  zone_id    = aws_route53_zone.primary.zone_id
}
