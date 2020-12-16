terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_route53_zone" "mdzhang_com" {
  name = "mdzhang.com"
}

resource "aws_route53_record" "aws_default_ns" {
  name    = aws_route53_zone.mdzhang_com.name
  records = ["ns-181.awsdns-22.com.", "ns-1972.awsdns-54.co.uk.", "ns-809.awsdns-37.net.", "ns-1066.awsdns-05.org."]
  ttl     = "172800"
  type    = "NS"
  zone_id = aws_route53_zone.mdzhang_com.zone_id
}

resource "aws_route53_record" "aws_default_soa" {
  name    = aws_route53_zone.mdzhang_com.name
  records = ["ns-809.awsdns-37.net. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400"]
  ttl     = "900"
  type    = "SOA"
  zone_id = aws_route53_zone.mdzhang_com.zone_id
}
