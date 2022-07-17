data "aws_caller_identity" "current" {}

# Create IAM identity provider with Github OIDC
resource "aws_iam_openid_connect_provider" "github_oidc" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com",
  ]

  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"]
}

# OIDC Assume Role Policy
data "aws_iam_policy_document" "oidc_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github_oidc.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "${aws_iam_openid_connect_provider.github_oidc.url}:aud"
      values   = aws_iam_openid_connect_provider.github_oidc.client_id_list
    }
  }
}

# OIDC Assume Role
resource "aws_iam_role" "github_oidc_assume_role" {
  name               = "github-oidc-assume-iam-role"
  assume_role_policy = data.aws_iam_policy_document.oidc_assume_role_policy.json
}
