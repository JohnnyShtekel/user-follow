import pdb

def user_serializer(user_model):
    user = {"name": user_model.name, "followers_number": user_model.followers_number}
    users = user_model.follows.all()
    groups = user_model.group.all()
    if not users:
        user["follows"] = []
    else:
        follows = []
        for user_obj in users:
            follow_user = user_serializer(user_obj)
            follows.append(follow_user)
            # pdb.set_trace()
        user["follows"] = follows

    if not groups:
        user["group"] = []
    else:
        return_groups = []
        for group in groups:
            follow_user = group_serializer(group)
            return_groups.append(follow_user)
        user["group"] = return_groups
    return user


def group_serializer(group_model):
    return {"name": group_model.name}