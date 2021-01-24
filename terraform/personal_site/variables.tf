variable "aws_region" {
  default = "us-west-1"
}

variable "domain" {
}

variable "zone_id" {
}

variable "aws_s3_zone_ids_by_region" {
  default = {
    us-west-1 = "Z2F56UZL2M1ACD"
  }
}
