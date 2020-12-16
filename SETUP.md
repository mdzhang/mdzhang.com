## Getting Started

1. Install Terraform

    Install the asdf version manager: <https://github.com/asdf-vm/asdf>

    From this repo's directory:

    ```sh
    asdf plugin-add terraform
    asdf plugin-add terraform-docs
    asdf plugin-add tflint
    asdf install
    ```

2. Add your AWS account information to [somewhere Terraform can find them](https://www.terraform.io/docs/providers/aws/#authentication), such as `~/.aws/credentials`

    ```sh
    mkdir -p ~/.aws/
    touch ~/.aws/credentials
    chmod 0600 ~/.aws/credentials

    # When entering the command below, be sure to replace <ACCESS-KEY>
    # and <SECRET-KEY> with your AWS credentials.
    #
    # After entering the command below type  to finish the command.
    cat >> ~/.aws/credentials
    [default]
    aws_access_key_id = <ACCESS-KEY>
    aws_secret_access_key = <SECRET-KEY>
    ```

3. Install the git pre-commit hook that corrects any formatting errors

    ```shell
    ~/src/github.com/mdzhang/mdzhang.com $ brew install pre-commit
    ~/src/github.com/mdzhang/mdzhang.com $ pre-commit install
    ```

4. Enable Terraform to connect to Terraform Cloud

    Create `~/.terraformrc` config with a following content:

    ```hcl
    credentials "app.terraform.io" {
      token = "xxx"
    }
    ```
