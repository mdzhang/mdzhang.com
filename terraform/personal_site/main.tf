resource "aws_route53_record" "personal_site_a" {
  alias {
    evaluate_target_health = "false"
    name                   = "s3-website-${var.aws_region}.amazonaws.com"
    zone_id                = var.aws_s3_zone_ids_by_region[var.aws_region]
  }

  name    = var.domain
  type    = "A"
  zone_id = var.zone_id
}

resource "aws_route53_record" "www_personal_site_a" {
  alias {
    evaluate_target_health = "false"
    name                   = "s3-website-${var.aws_region}.amazonaws.com"
    zone_id                = var.aws_s3_zone_ids_by_region[var.aws_region]

  }

  name    = "www.${var.domain}"
  type    = "A"
  zone_id = var.zone_id
}

resource "aws_s3_bucket" "personal_site_logs" {
  bucket         = "logs.${var.domain}"

  force_destroy = false
}

resource "aws_s3_bucket_acl" "personal_site_logs" {
  acl    = "log-delivery-write"
  bucket = aws_s3_bucket.personal_site_logs.id
}

resource "aws_s3_bucket" "personal_site" {
  bucket         = var.domain
}

resource "aws_s3_bucket_logging" "personal_site" {
  bucket = aws_s3_bucket.personal_site.id

  target_bucket = "logs.${var.domain}"
  target_prefix = "root/"
}

resource "aws_s3_bucket_website_configuration" "personal_site" {
  bucket = aws_s3_bucket.personal_site.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404/index.html"
  }
}

resource "aws_s3_bucket_acl" "personal_site" {
  acl    = "public-read"
  bucket = aws_s3_bucket.personal_site.id
}

resource "aws_s3_bucket" "www_personal_site" {
  bucket         = "www.${var.domain}"
  force_destroy  = "false"
}

resource "aws_s3_bucket_request_payment_configuration" "www_personal_site" {
  bucket = aws_s3_bucket.www_personal_site.id

  payer = "Requester"
}

resource "aws_s3_bucket_versioning" "www_personal_site" {
  bucket = aws_s3_bucket.www_personal_site.id

  versioning_configuration {
    status = "Disabled"
  }
}

resource "aws_s3_bucket_website_configuration" "www_personal_site" {
  bucket = aws_s3_bucket.www_personal_site.id

  redirect_all_requests_to {
    host_name = var.domain
  }
}

resource "aws_s3_bucket_acl" "www_personal_site" {
  acl    = "public-read"
  bucket = aws_s3_bucket.www_personal_site.id
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
