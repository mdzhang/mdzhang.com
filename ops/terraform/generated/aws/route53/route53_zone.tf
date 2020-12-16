resource "aws_route53_zone" "mdzhang_com" {
  comment       = "HostedZone created by Route53 Registrar"
  force_destroy = "false"
  name          = "mdzhang.com"
}
