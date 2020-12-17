terraform {
  required_version = "~> 0.12.0"
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

resource "aws_route53_zone" "personal_site" {
  name = var.domain
}

resource "aws_route53_record" "aws_default_ns" {
  name    = aws_route53_zone.personal_site.name
  records = var.aws_dns_ns
  ttl     = "172800"
  type    = "NS"
  zone_id = aws_route53_zone.personal_site.zone_id
}

resource "aws_route53_record" "aws_default_soa" {
  name    = aws_route53_zone.personal_site.name
  records = ["ns-809.awsdns-37.net. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400"]
  ttl     = "900"
  type    = "SOA"
  zone_id = aws_route53_zone.personal_site.zone_id
}

module "personal_site_prod" {
  source = "./personal_site"

  aws_region = var.aws_region
  domain     = "mdzhang.com"
  zone_id    = aws_route53_zone.personal_site.zone_id
}
