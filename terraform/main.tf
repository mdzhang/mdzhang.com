terraform {
  required_version = "1.5.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.22"
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

locals {
  gh_action_role_name = "github-action--${replace(var.domain, ".", "-")}--role"
}

module "github_oidc" {
  source = "github.com/moritzheiber/terraform-aws-oidc-github-actions-module?ref=v0.2.2"

  github_repositories = toset(["mdzhang/mdzhang.com"])
  role_names          = toset([local.gh_action_role_name])
}

module "personal_site" {
  source = "./personal_site"

  aws_region = var.aws_region
  domain     = var.domain
  zone_id    = aws_route53_zone.primary.zone_id

  gh_action_role = local.gh_action_role_name
}
