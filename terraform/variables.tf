variable "aws_region" {
  default = "us-west-1"
}

variable "aws_dns_ns" {
  default = [
    "ns-181.awsdns-22.com.",
    "ns-1972.awsdns-54.co.uk.",
    "ns-809.awsdns-37.net.",
    "ns-1066.awsdns-05.org."
  ]
}

variable "domain" {
  default = "staging-1.mdzhang.com"
}
