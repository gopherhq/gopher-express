## User Settings

Gopher saves anything with the class `gopher-setting` as [Extension Data](https://docs.gopher.email/reference#section-extension-data). All the plumbing is done, you just copy, paste and rename form fields within index.html

```html
<form class="form-horizontal settings-form hide" method="POST" action="/saveSettings">

    <!-- Plain Text Input -->
    <div class="form-group">
        <label for="inputName" class="control-label">Name</label>
        <input type="text" class="gopher-setting form-control" id="inputName" placeholder="Name">
    </div>
    <!-- End Plain Text Input -->


    <!-- Another Plain Text Input Example -->
    <div class="form-group">
        <label for="inputEmail" class="control-label">Email</label>
        <input type="text" class="gopher-setting form-control" id="inputEmail" placeholder="Email">
    </div>
    <!-- End Plain Text Input -->


    <!-- Text Area -->
    <div class="form-group">
        <label for="default_reply">Comment:</label>
        <textarea class="gopher-setting form-control" rows="5" id="default_reply"></textarea>
    </div>
    <!-- End Text Area -->


    <!-- Checkbox -->
    <div class="form-group">
        <div class="checkbox">
            <label>
                <input type="checkbox" id="setting_1" class="gopher-setting" value="1">Example Checkbox Setting</label>
        </div>
        <div class="checkbox">
            <label>
                <input type="checkbox" id="setting_2" class="gopher-setting" value="2">Another Setting</label>
        </div>
    </div>
    <!-- End Checkbox -->

    <br />
    <br />
    <!-- Password Field  -->
    <div class="form-group">
        <label for="secret" lass="control-label ">Password</label>
        <input type="password" class="gopher-setting form-control" id="secret" placeholder="Password Field">
        <span class="help-block">Add a hint like this</span>
    </div>
    <!-- End Password Field -->

    <!-- Dropdown Select  -->
    <div class="form-group">
        <label for="select" class="control-label">City</label>
        <select class="gopher-setting form-control" id="select">
            <option>San Francisco</option>
            <option>Chicago</option>
            <option>London</option>
            <option>New York</option>
        </select>
    </div>
    <!-- End Dropdown Select -->


    <div class="form-group">
        <button type="submit" class="btn btn-primary" id="save_settings">Submit</button>
        <!-- <span class="help-block hide"><i class="glyphicon glyphicon-ok"></i> Settings Saved </span> -->
    </div>
</form>
```

The above HTML renders this form:

![](https://cdn.glitch.com/ffcabfaa-5ce4-465e-bdda-02cdb74a9f90%2Fimage.png?1523334801321)
