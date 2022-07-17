# Terraform

This project updates infrastructure in AWS using automated [Terraform](https://www.terraform.io/) runs through [Github actions](https://github.com/mdzhang/mdzhang.com/actions/workflows/terraform.yml) and [Terraform Cloud](https://cloud.hashicorp.com/products/terraform)

The Oauth connection is responsible for triggering a run in TF Cloud after a push to a pull request.

GitHub actions run commands that don't require accessing TF Cloud.

## Setup

* Install [`asdf`](https://asdf-vm.com/)
* Install `terraform`
  ```sh
  brew install asdf
  asdf plugin-add terraform
  asdf plugin-add terraform-docs
  asdf plugin-add tflint
  asdf install
  ```
* Login from CLI
  ```sh
  terraform login
  ```
* Proceed with planning:
  ```sh
  terraform init
  terraform plan # triggers run in TF cloud
  ```
* Push changes up and create a pull request to have Terraform Cloud automatically trigger a run
* Applies can only occur through TF cloud when manually triggered after a successful plan on a run triggered by a commit to the `main` branch

## Tips

Add to shell startup

```sh
alias tf='terraform'
```
