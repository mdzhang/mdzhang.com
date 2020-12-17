terraform {
  required_version = "~> 0.14.0"
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

resource "aws_route53_record" "personal_site_a" {
  alias {
    evaluate_target_health = "false"
    name                   = "s3-website-${var.aws_region}.amazonaws.com"
    zone_id                = aws_route53_zone.personal_site.zone_id
  }

  name    = var.domain
  type    = "A"
  zone_id = aws_route53_zone.personal_site.zone_id
}

resource "aws_route53_record" "www_personal_site_a" {
  alias {
    evaluate_target_health = "false"
    name                   = "s3-website-${var.aws_region}.amazonaws.com"
    zone_id                = aws_route53_zone.personal_site.zone_id
  }

  name    = "www.${var.domain}"
  type    = "A"
  zone_id = aws_route53_zone.personal_site.zone_id
}

resource "aws_s3_bucket" "personal_site_logs" {
  bucket = "logs.${var.domain}"

  grant {
    permissions = ["READ_ACP", "WRITE"]
    type        = "Group"
    uri         = "http://acs.amazonaws.com/groups/s3/LogDelivery"
  }

  grant {
    permissions = ["FULL_CONTROL"]
    type        = "CanonicalUser"
  }

  hosted_zone_id = aws_route53_zone.personal_site.zone_id
  request_payer  = "BucketOwner"
}

resource "aws_s3_bucket" "personal_site" {
  bucket         = var.domain
  hosted_zone_id = aws_route53_zone.personal_site.zone_id
  force_destroy  = "false"

  grant {
    permissions = ["WRITE_ACP", "READ_ACP", "WRITE", "READ"]
    type        = "CanonicalUser"
  }

  logging {
    target_bucket = "logs.${var.domain}"
    target_prefix = "root/"
  }

  request_payer = "BucketOwner"

  versioning {
    enabled    = "false"
    mfa_delete = "false"
  }

  website {
    error_document = "404.html"
    index_document = "index.html"
  }

  website_domain   = "s3-website-${var.aws_region}.amazonaws.com"
  website_endpoint = "${var.domain}.s3-website-${var.aws_region}.amazonaws.com"
}

resource "aws_s3_bucket" "www_personal_site" {
  arn            = "arn:aws:s3:::www.${var.domain}"
  bucket         = "www.${var.domain}"
  force_destroy  = "false"
  hosted_zone_id = aws_route53_zone.personal_site.zone_id
  request_payer  = "BucketOwner"

  versioning {
    enabled    = "false"
    mfa_delete = "false"
  }

  website {
    redirect_all_requests_to = var.domain
  }

  website_domain   = "s3-website-${var.aws_region}.amazonaws.com"
  website_endpoint = "www.${var.domain}.s3-website-${var.aws_region}.amazonaws.com"
}

data "aws_iam_policy_document" "public" {
  statement {
    sid = "Allow Public Access to All Objects"

    actions = [
      "s3:GetObject"
    ]

    resources = [
      "arn:aws:s3:::${var.domain}/*",
    ]
  }
}

resource "aws_s3_bucket_policy" "personal_site" {
  bucket = var.domain

  policy = data.aws_iam_policy_document.public.json
}
